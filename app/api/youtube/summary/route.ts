import { NextRequest, NextResponse } from 'next/server';

// TypeScript interfaces
interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
  likeCount: string;
  commentCount: string;
  description: string;
  tags: string[];
}

interface YouTubeChannel {
  id: string;
  title: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

// YouTube Data API utilities
function extractChannelId(url: string): string | null {
  const patterns = [
    /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/user\/([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractHandle(url: string): string | null {
  const handleMatch = url.match(/youtube\.com\/@([a-zA-Z0-9_-]+)/);
  return handleMatch ? handleMatch[1] : null;
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

async function fetchChannelData(channelId: string, apiKey: string): Promise<YouTubeChannel | null> {
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
    console.log('Fetching channel data from:', url.replace(apiKey, 'API_KEY_HIDDEN'));
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API error response:', errorText);
      throw new Error(`YouTube API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.error('No channel data found for ID:', channelId);
      return null;
    }

    const channel = data.items[0];
    return {
      id: channel.id,
      title: channel.snippet.title,
      subscriberCount: channel.statistics.subscriberCount,
      viewCount: channel.statistics.viewCount,
      videoCount: channel.statistics.videoCount
    };
  } catch (error) {
    console.error('Error fetching channel data:', error);
    return null;
  }
}

async function fetchChannelVideos(channelId: string, apiKey: string, maxResults: number = 50): Promise<YouTubeVideo[]> {
  try {
    // First, get the uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );
    
    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.status}`);
    }

    const channelData = await channelResponse.json();
    if (!channelData.items || channelData.items.length === 0) {
      return [];
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Then get videos from the uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`
    );

    if (!videosResponse.ok) {
      throw new Error(`YouTube API error: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();
    if (!videosData.items) {
      return [];
    }

    // Get video IDs for detailed statistics
    const videoIds = videosData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');

    const videoStatsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`
    );

    if (!videoStatsResponse.ok) {
      throw new Error(`YouTube API error: ${videoStatsResponse.status}`);
    }

    const videoStatsData = await videoStatsResponse.json();
    
        return videoStatsData.items.map((video: any) => ({
          id: video.id,
          title: video.snippet.title,
          publishedAt: video.snippet.publishedAt,
          viewCount: video.statistics.viewCount,
          duration: video.contentDetails.duration,
          likeCount: video.statistics.likeCount || '0',
          commentCount: video.statistics.commentCount || '0',
          description: video.snippet.description,
          tags: video.snippet.tags || []
        }));
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return [];
  }
}

async function getChannelIdFromHandle(handle: string, apiKey: string): Promise<string | null> {
  try {
    const encodedHandle = encodeURIComponent(handle);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodedHandle}&key=${apiKey}`;
    console.log('Searching for handle:', handle, 'URL:', url.replace(apiKey, 'API_KEY_HIDDEN'));
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API error response:', errorText);
      throw new Error(`YouTube API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.error('No channel found for handle:', handle);
      return null;
    }

    // Find the channel that matches the handle
    for (const item of data.items) {
      if (item.snippet.channelId) {
        console.log('Found channel ID for handle:', handle, '->', item.snippet.channelId);
        return item.snippet.channelId;
      }
    }

    return null;
  } catch (error) {
    console.error('Error getting channel ID from handle:', error);
    return null;
  }
}

async function getChannelIdFromVideo(videoId: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }

    return data.items[0].snippet.channelId;
  } catch (error) {
    console.error('Error getting channel ID from video:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Check if it's a YouTube URL
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return NextResponse.json({ error: 'Please provide a valid YouTube URL' }, { status: 400 });
    }

    const apiKey = process.env.YT_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 });
    }

    console.log('Processing URL:', url);

    let channelId = extractChannelId(url);
    
    // If it's a handle URL, get the channel ID from the handle
    if (!channelId) {
      const handle = extractHandle(url);
      if (handle) {
        channelId = await getChannelIdFromHandle(handle, apiKey);
      }
    }
    
    // If it's a video URL, get the channel ID from the video
    if (!channelId) {
      const videoId = extractVideoId(url);
      if (videoId) {
        channelId = await getChannelIdFromVideo(videoId, apiKey);
      }
    }

    if (!channelId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // Fetch fresh data
    console.log('Fetching data for channel ID:', channelId);
    const channelData = await fetchChannelData(channelId, apiKey);
    if (!channelData) {
      return NextResponse.json({ 
        error: 'Channel not found. Please check the URL and try again.',
        details: `Channel ID: ${channelId}`
      }, { status: 404 });
    }

    const videos = await fetchChannelVideos(channelId, apiKey, 50);
    
    // Calculate analytics
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    const videos30d = videos.filter((video: YouTubeVideo) => new Date(video.publishedAt) >= thirtyDaysAgo);
    const videos90d = videos.filter((video: YouTubeVideo) => new Date(video.publishedAt) >= ninetyDaysAgo);

    const views30d = videos30d.reduce((sum, video) => sum + parseInt(video.viewCount), 0);
    const views90d = videos90d.reduce((sum, video) => sum + parseInt(video.viewCount), 0);

    // Get last 10 videos for average views
    const last10Videos = videos.slice(0, 10);
    const avgViewsLast10 = last10Videos.length > 0 
      ? last10Videos.reduce((sum, video) => sum + parseInt(video.viewCount), 0) / last10Videos.length
      : 0;

    // Create view series for chart (last 90 days, grouped by week)
    const viewSeries = [];
    for (let i = 12; i >= 0; i--) {
      const weekStart = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      const weekVideos = videos.filter((video: YouTubeVideo) => {
        const publishDate = new Date(video.publishedAt);
        return publishDate >= weekStart && publishDate < weekEnd;
      });
      
      const weekViews = weekVideos.reduce((sum, video) => sum + parseInt(video.viewCount), 0);
      
      // Format date properly for the chart
      const formattedDate = weekStart.toISOString().split('T')[0];
      
      viewSeries.push({
        date: formattedDate,
        views: weekViews
      });
    }
    
        console.log('View series data:', viewSeries);

        // Calculate advanced analytics
        const totalLikes = videos.reduce((sum, video) => sum + parseInt(video.likeCount), 0);
        const totalComments = videos.reduce((sum, video) => sum + parseInt(video.commentCount), 0);
        
        // Calculate average engagement rate per video (correct method)
        const avgEngagementRate = videos.length > 0 
          ? videos.reduce((sum, video) => {
              const videoViews = parseInt(video.viewCount);
              const videoLikes = parseInt(video.likeCount);
              const videoComments = parseInt(video.commentCount);
              
              // Calculate engagement rate for this individual video
              const videoEngagementRate = videoViews > 0 
                ? ((videoLikes + videoComments) / videoViews) * 100 
                : 0;
              
              return sum + videoEngagementRate;
            }, 0) / videos.length
          : 0;

        // Calculate average video duration in minutes
        const avgDurationMinutes = videos.length > 0 
          ? videos.reduce((sum, video) => {
              // Parse ISO 8601 duration format (e.g., PT4M13S, PT1H2M30S, PT30S)
              const duration = video.duration;
              let totalMinutes = 0;
              
              // Extract hours
              const hoursMatch = duration.match(/(\d+)H/);
              if (hoursMatch) {
                totalMinutes += parseInt(hoursMatch[1]) * 60;
              }
              
              // Extract minutes
              const minutesMatch = duration.match(/(\d+)M/);
              if (minutesMatch) {
                totalMinutes += parseInt(minutesMatch[1]);
              }
              
              // Extract seconds and convert to minutes
              const secondsMatch = duration.match(/(\d+)S/);
              if (secondsMatch) {
                totalMinutes += parseInt(secondsMatch[1]) / 60;
              }
              
              return sum + totalMinutes;
            }, 0) / videos.length 
          : 0;

        // Get trending topics from video tags
        const allTags = videos.flatMap(video => video.tags);
        const tagFrequency = allTags.reduce((acc: Record<string, number>, tag: string) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        }, {});
        const trendingTopics = Object.entries(tagFrequency)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([tag]) => tag);

        // Calculate upload frequency (videos per week)
        const uploadFrequency = videos90d.length / 13; // 13 weeks in 90 days

        const analyticsData = {
          channelTitle: channelData.title,
          subscriberCount: parseInt(channelData.subscriberCount),
          totalViewCount: parseInt(channelData.viewCount),
          views30d,
          views90d,
          uploads90d: videos90d.length,
          avgViewsLast10,
          viewSeries,
          // Advanced analytics
          totalLikes,
          totalComments,
          avgEngagementRate: Math.round(avgEngagementRate * 100) / 100,
          avgDurationMinutes: Math.round(avgDurationMinutes * 10) / 10,
          trendingTopics,
          uploadFrequency: Math.round(uploadFrequency * 10) / 10,
          totalVideos: videos.length
        };

    return NextResponse.json(analyticsData);

  } catch (error) {
    console.error('Error in YouTube summary API:', error);
    
    // Check if it's a YouTube API error
    if (error instanceof Error && error.message.includes('YouTube API error')) {
      return NextResponse.json(
        { 
          error: 'YouTube API error. Please check your API key and try again.',
          details: error.message 
        }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
