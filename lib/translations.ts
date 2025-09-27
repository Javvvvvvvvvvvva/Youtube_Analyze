export type Language = 'en' | 'ko' | 'zh';

export interface Translations {
  // Header
  header: {
    title: string;
    channels: string;
    analytics: string;
    insights: string;
  };

  // Hero Section
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
  };

  // Form
  form: {
    title: string;
    subtitle: string;
    placeholder: string;
    analyzeButton: string;
    analyzingButton: string;
    supportedFormats: string;
    channelFormat: string;
    customFormat: string;
    handleFormat: string;
    videoFormat: string;
  };

  // KPI Cards
  kpi: {
    subscribers: string;
    totalViews: string;
    dailyAvgViews: string;
    avgViewsPerVideo: string;
    last30Days: string;
    last10Videos: string;
  };

  // Charts
  charts: {
    viewsOverTime: string;
    weeklyViewTotals: string;
  };

  // Performance Section
  performance: {
    title: string;
    subtitle: string;
    days30: string;
    days90: string;
    dailyAverage: string;
    recentPerformance: string;
    quarterlyView: string;
    last30Days: string;
  };

  // Revenue Section
  revenue: {
    monthlyAdRevenue: string;
    yearlyAdRevenue: string;
    perVideoSponsorship: string;
    conservative: string;
    base: string;
    aggressive: string;
    monthlyTooltip: string;
    yearlyTooltip: string;
    sponsorshipTooltip: string;
  };

  // Footer
  footer: {
    disclaimer: string;
  };

  // Error Messages
  errors: {
    urlRequired: string;
    invalidUrl: string;
    channelNotFound: string;
    apiError: string;
    internalError: string;
  };

  // Advanced Analytics
  advancedAnalytics: {
    totalLikes: string;
    totalComments: string;
    engagementRate: string;
    avgVideoDuration: string;
    uploadFrequency: string;
    trendingTopics: string;
    allTimeEngagement: string;
    communityInteraction: string;
    likesCommentsViews: string;
    contentLengthAnalysis: string;
    videosPerWeek: string;
    mostUsedTags: string;
  };

  // Enhanced Chart
  enhancedChart: {
    viewsOverTime: string;
    weeklyViewTotals: string;
    interactiveViewAnalytics: string;
    peak: string;
    average: string;
    range: string;
    line: string;
    area: string;
    noViewDataAvailable: string;
    tryDifferentChannel: string;
  };

  // Export Data
  exportData: {
    exportAnalyticsData: string;
    downloadComprehensiveReports: string;
    csvExport: string;
    rawDataSpreadsheet: string;
    htmlReport: string;
    formattedReportSharing: string;
    note: string;
    csvExportsInclude: string;
    htmlReportsFormatted: string;
    convertedToPdf: string;
  };

  // Refresh Button
  refreshButton: {
    refreshing: string;
    updated: string;
    refreshData: string;
    lastUpdated: string;
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };

  // AI Insights
  aiInsights: {
    title: string;
    subtitle: string;
    noInsights: string;
    disclaimer: {
      title: string;
      description: string;
    };
    highEngagement: {
      title: string;
      description: string;
      action: string;
    };
    lowEngagement: {
      title: string;
      description: string;
      action: string;
    };
    highFrequency: {
      title: string;
      description: string;
      action: string;
    };
    lowFrequency: {
      title: string;
      description: string;
      action: string;
    };
    longVideos: {
      title: string;
      description: string;
      action: string;
    };
    shortVideos: {
      title: string;
      description: string;
      action: string;
    };
    growingChannel: {
      title: string;
      description: string;
      action: string;
    };
    contentStrategy: {
      title: string;
      description: string;
      action: string;
    };
    revenuePotential: {
      title: string;
      description: string;
      action: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      title: 'YouTube Analytics',
      channels: 'Channels',
      analytics: 'Analytics',
      insights: 'Insights',
    },
    hero: {
      badge: 'Powered by YouTube Data API',
      title: 'Analyze YouTube Channel',
      titleHighlight: 'Performance & Revenue',
      description: 'Get detailed analytics, revenue estimates, and sponsorship valuations for any YouTube channel or video. Discover insights that help you understand channel performance and monetization potential.',
    },
    form: {
      title: 'Enter YouTube URL',
      subtitle: 'Paste any YouTube channel or video URL to get started',
      placeholder: 'https://www.youtube.com/channel/UC... or https://www.youtube.com/watch?v=...',
      analyzeButton: 'Analyze Channel',
      analyzingButton: 'Analyzing Channel...',
      supportedFormats: 'Supported URL formats:',
      channelFormat: 'Channel: youtube.com/channel/UC...',
      customFormat: 'Custom URL: youtube.com/c/channelname',
      handleFormat: 'Handle: youtube.com/@username',
      videoFormat: 'Video: youtube.com/watch?v=...',
    },
    kpi: {
      subscribers: 'Subscribers',
      totalViews: 'Total Views',
      dailyAvgViews: 'Daily Avg Views',
      avgViewsPerVideo: 'Avg Views/Video',
      last30Days: 'Last 30 days average',
      last10Videos: 'Last 10 videos',
    },
    charts: {
      viewsOverTime: 'Views Over Time',
      weeklyViewTotals: 'Weekly view totals for the last 90 days',
    },
    performance: {
      title: 'View Performance',
      subtitle: 'Recent activity metrics',
      days30: '30 Days',
      days90: '90 Days',
      dailyAverage: 'Daily Average',
      recentPerformance: 'Recent performance',
      quarterlyView: 'Quarterly view',
      last30Days: 'Last 30 days',
    },
    revenue: {
      monthlyAdRevenue: 'Monthly Ad Revenue Estimate',
      yearlyAdRevenue: 'Yearly Ad Revenue Estimate',
      perVideoSponsorship: 'Per-Video Sponsorship Estimate',
      conservative: 'Conservative',
      base: 'Base',
      aggressive: 'Aggressive',
      monthlyTooltip: 'RPM = Revenue Per Mille (per 1,000 views). Actual RPM varies by region, niche, ad fill rates, and audience demographics.',
      yearlyTooltip: 'Annual revenue projection based on 30-day performance. Growth, seasonality, and algorithm changes will affect actual results.',
      sponsorshipTooltip: 'Sponsorship CPM typically ranges $5-$30 per video based on average views. Actual rates depend on niche, audience engagement, and brand alignment.',
    },
    footer: {
      disclaimer: 'This is only an estimate. Actual YouTube revenue may differ significantly based on region, niche, ad fill rates, audience demographics, and other factors. Use this data for informational purposes only.',
    },
    errors: {
      urlRequired: 'URL parameter is required',
      invalidUrl: 'Please provide a valid YouTube URL',
      channelNotFound: 'Channel not found. Please check the URL and try again.',
      apiError: 'YouTube API error. Please check your API key and try again.',
      internalError: 'Internal server error',
    },
    advancedAnalytics: {
      totalLikes: 'Total Likes',
      totalComments: 'Total Comments',
      engagementRate: 'Engagement Rate',
      avgVideoDuration: 'Avg Video Duration',
      uploadFrequency: 'Upload Frequency',
      trendingTopics: 'Trending Topics',
      allTimeEngagement: 'All-time engagement',
      communityInteraction: 'Community interaction',
      likesCommentsViews: 'Likes + Comments / Views',
      contentLengthAnalysis: 'Content length analysis',
      videosPerWeek: 'Videos per week',
      mostUsedTags: 'Most used tags in recent videos',
    },
    enhancedChart: {
      viewsOverTime: 'Views Over Time',
      weeklyViewTotals: 'Weekly view totals for the last 90 days',
      interactiveViewAnalytics: 'Interactive view analytics',
      peak: 'Peak',
      average: 'Average',
      range: 'Range',
      line: 'Line',
      area: 'Area',
      noViewDataAvailable: 'No view data available',
      tryDifferentChannel: 'Try analyzing a different channel',
    },
    exportData: {
      exportAnalyticsData: 'Export Analytics Data',
      downloadComprehensiveReports: 'Download comprehensive reports in multiple formats',
      csvExport: 'CSV Export',
      rawDataSpreadsheet: 'Raw data for spreadsheet analysis',
      htmlReport: 'HTML Report',
      formattedReportSharing: 'Formatted report for sharing',
      note: 'Note',
      csvExportsInclude: 'CSV exports include all raw data for analysis.',
      htmlReportsFormatted: 'HTML reports are formatted for easy sharing and can be',
      convertedToPdf: 'converted to PDF using your browser\'s print function.',
    },
    refreshButton: {
      refreshing: 'Refreshing...',
      updated: 'Updated!',
      refreshData: 'Refresh Data',
      lastUpdated: 'Last updated',
      justNow: 'Just now',
      minutesAgo: 'm ago',
      hoursAgo: 'h ago',
      daysAgo: 'd ago',
    },
    aiInsights: {
      title: 'AI-Powered Insights',
      subtitle: 'Smart recommendations based on your channel data',
      noInsights: 'No specific insights available for this channel',
      disclaimer: {
        title: 'AI Analysis',
        description: 'These insights are generated using data analysis algorithms. Results may vary based on channel performance and industry benchmarks.'
      },
      highEngagement: {
        title: 'Excellent Engagement Rate',
        description: 'Your engagement rate is above 4%, which is excellent for most channels.',
        action: 'Keep creating content that encourages likes and comments!'
      },
      lowEngagement: {
        title: 'Low Engagement Rate',
        description: 'Your engagement rate is below 1.5%. Consider asking questions or creating more interactive content.',
        action: 'Try asking viewers to like, comment, or share your videos.'
      },
      highFrequency: {
        title: 'Consistent Upload Schedule',
        description: 'You upload more than 3 videos per week, which helps maintain audience engagement.',
        action: 'Maintain this consistency to keep your audience engaged.'
      },
      lowFrequency: {
        title: 'Infrequent Uploads',
        description: 'You upload less than 1 video per week. Consider increasing your upload frequency.',
        action: 'Try uploading at least 2-3 videos per week for better growth.'
      },
      longVideos: {
        title: 'Long-Form Content',
        description: 'Your average video length is over 15 minutes, which works well for detailed content.',
        action: 'Consider adding timestamps and chapters for better viewer experience.'
      },
      shortVideos: {
        title: 'Short-Form Content',
        description: 'Your average video length is under 5 minutes, perfect for quick consumption.',
        action: 'Consider creating series or playlists to increase watch time.'
      },
      growingChannel: {
        title: 'Channel Growth Trend',
        description: 'Your recent views show positive growth compared to your 90-day average.',
        action: 'Continue with your current content strategy!'
      },
      contentStrategy: {
        title: 'Content Focus Areas',
        description: 'Your most popular topics include: {topics}. Focus on these areas for continued success.',
        action: 'Create more content around these trending topics.'
      },
      revenuePotential: {
        title: 'Strong Revenue Potential',
        description: 'Your channel has significant monetization potential based on your view counts.',
        action: 'Consider optimizing your ad placements and exploring sponsorships.'
      }
    },
  },

  ko: {
    header: {
      title: '유튜브 분석',
      channels: '채널',
      analytics: '분석',
      insights: '인사이트',
    },
    hero: {
      badge: 'YouTube Data API 지원',
      title: '유튜브 채널 분석',
      titleHighlight: '성과 및 수익',
      description: '모든 유튜브 채널이나 비디오에 대한 상세한 분석, 수익 추정치, 스폰서십 평가를 받아보세요. 채널 성과와 수익화 잠재력을 이해하는 데 도움이 되는 인사이트를 발견하세요.',
    },
    form: {
      title: '유튜브 URL 입력',
      subtitle: '분석을 시작하려면 유튜브 채널 또는 비디오 URL을 붙여넣으세요',
      placeholder: 'https://www.youtube.com/channel/UC... 또는 https://www.youtube.com/watch?v=...',
      analyzeButton: '채널 분석',
      analyzingButton: '채널 분석 중...',
      supportedFormats: '지원되는 URL 형식:',
      channelFormat: '채널: youtube.com/channel/UC...',
      customFormat: '사용자 정의 URL: youtube.com/c/channelname',
      handleFormat: '핸들: youtube.com/@username',
      videoFormat: '비디오: youtube.com/watch?v=...',
    },
    kpi: {
      subscribers: '구독자',
      totalViews: '총 조회수',
      dailyAvgViews: '일일 평균 조회수',
      avgViewsPerVideo: '비디오당 평균 조회수',
      last30Days: '최근 30일 평균',
      last10Videos: '최근 10개 비디오',
    },
    charts: {
      viewsOverTime: '시간별 조회수',
      weeklyViewTotals: '최근 90일간의 주간 조회수 합계',
    },
    performance: {
      title: '조회수 성과',
      subtitle: '최근 활동 지표',
      days30: '30일',
      days90: '90일',
      dailyAverage: '일일 평균',
      recentPerformance: '최근 성과',
      quarterlyView: '분기별 조회수',
      last30Days: '최근 30일',
    },
    revenue: {
      monthlyAdRevenue: '월간 광고 수익 추정',
      yearlyAdRevenue: '연간 광고 수익 추정',
      perVideoSponsorship: '비디오당 스폰서십 추정',
      conservative: '보수적',
      base: '기본',
      aggressive: '공격적',
      monthlyTooltip: 'RPM = 천 조회당 수익. 실제 RPM은 지역, 틈새 시장, 광고 채우기 비율, 시청자 인구 통계에 따라 다릅니다.',
      yearlyTooltip: '30일 성과를 기반으로 한 연간 수익 예상. 성장, 계절성, 알고리즘 변경이 실제 결과에 영향을 미칩니다.',
      sponsorshipTooltip: '스폰서십 CPM은 일반적으로 평균 조회수를 기준으로 비디오당 $5-$30 범위입니다. 실제 요금은 틈새 시장, 시청자 참여도, 브랜드 정렬에 따라 다릅니다.',
    },
    footer: {
      disclaimer: '이는 추정치일 뿐입니다. 실제 유튜브 수익은 지역, 틈새 시장, 광고 채우기 비율, 시청자 인구 통계 및 기타 요인에 따라 크게 달라질 수 있습니다. 이 데이터는 정보 제공 목적으로만 사용하세요.',
    },
    errors: {
      urlRequired: 'URL 매개변수가 필요합니다',
      invalidUrl: '유효한 유튜브 URL을 제공해 주세요',
      channelNotFound: '채널을 찾을 수 없습니다. URL을 확인하고 다시 시도해 주세요.',
      apiError: '유튜브 API 오류입니다. API 키를 확인하고 다시 시도해 주세요.',
      internalError: '내부 서버 오류',
    },
    advancedAnalytics: {
      totalLikes: '총 좋아요',
      totalComments: '총 댓글',
      engagementRate: '참여율',
      avgVideoDuration: '평균 비디오 길이',
      uploadFrequency: '업로드 빈도',
      trendingTopics: '인기 주제',
      allTimeEngagement: '전체 기간 참여도',
      communityInteraction: '커뮤니티 상호작용',
      likesCommentsViews: '좋아요 + 댓글 / 조회수',
      contentLengthAnalysis: '콘텐츠 길이 분석',
      videosPerWeek: '주당 비디오 수',
      mostUsedTags: '최근 비디오에서 가장 많이 사용된 태그',
    },
    enhancedChart: {
      viewsOverTime: '시간별 조회수',
      weeklyViewTotals: '최근 90일간의 주간 조회수 합계',
      interactiveViewAnalytics: '대화형 조회수 분석',
      peak: '최고점',
      average: '평균',
      range: '범위',
      line: '선형',
      area: '영역',
      noViewDataAvailable: '조회수 데이터가 없습니다',
      tryDifferentChannel: '다른 채널을 분석해 보세요',
    },
    exportData: {
      exportAnalyticsData: '분석 데이터 내보내기',
      downloadComprehensiveReports: '다양한 형식의 포괄적인 보고서 다운로드',
      csvExport: 'CSV 내보내기',
      rawDataSpreadsheet: '스프레드시트 분석용 원시 데이터',
      htmlReport: 'HTML 보고서',
      formattedReportSharing: '공유용 서식이 지정된 보고서',
      note: '참고',
      csvExportsInclude: 'CSV 내보내기는 분석을 위한 모든 원시 데이터를 포함합니다.',
      htmlReportsFormatted: 'HTML 보고서는 쉬운 공유를 위해 서식이 지정되어 있으며',
      convertedToPdf: '브라우저의 인쇄 기능을 사용하여 PDF로 변환할 수 있습니다.',
    },
    refreshButton: {
      refreshing: '새로고침 중...',
      updated: '업데이트됨!',
      refreshData: '데이터 새로고침',
      lastUpdated: '마지막 업데이트',
      justNow: '방금 전',
      minutesAgo: '분 전',
      hoursAgo: '시간 전',
      daysAgo: '일 전',
    },
    aiInsights: {
      title: 'AI 기반 인사이트',
      subtitle: '채널 데이터를 기반으로 한 스마트 추천',
      noInsights: '이 채널에 대한 특별한 인사이트가 없습니다',
      disclaimer: {
        title: 'AI 분석',
        description: '이러한 인사이트는 데이터 분석 알고리즘을 사용하여 생성됩니다. 결과는 채널 성과 및 업계 벤치마크에 따라 달라질 수 있습니다.'
      },
      highEngagement: {
        title: '우수한 참여율',
        description: '참여율이 4% 이상으로 대부분의 채널에 비해 우수합니다.',
        action: '좋아요와 댓글을 유도하는 콘텐츠를 계속 만들어보세요!'
      },
      lowEngagement: {
        title: '낮은 참여율',
        description: '참여율이 1.5% 미만입니다. 질문을 하거나 더 상호작용적인 콘텐츠를 만들어보세요.',
        action: '시청자에게 좋아요, 댓글 또는 공유를 요청해보세요.'
      },
      highFrequency: {
        title: '일관된 업로드 일정',
        description: '주당 3개 이상의 비디오를 업로드하여 시청자 참여를 유지하고 있습니다.',
        action: '시청자 참여를 유지하기 위해 이 일관성을 유지하세요.'
      },
      lowFrequency: {
        title: '드문 업로드',
        description: '주당 1개 미만의 비디오를 업로드하고 있습니다. 업로드 빈도를 늘려보세요.',
        action: '더 나은 성장을 위해 주당 최소 2-3개의 비디오를 업로드해보세요.'
      },
      longVideos: {
        title: '장편 콘텐츠',
        description: '평균 비디오 길이가 15분 이상으로 상세한 콘텐츠에 적합합니다.',
        action: '더 나은 시청자 경험을 위해 타임스탬프와 챕터를 추가해보세요.'
      },
      shortVideos: {
        title: '단편 콘텐츠',
        description: '평균 비디오 길이가 5분 미만으로 빠른 소비에 적합합니다.',
        action: '시청 시간을 늘리기 위해 시리즈나 재생목록을 만들어보세요.'
      },
      growingChannel: {
        title: '채널 성장 추세',
        description: '최근 조회수가 90일 평균 대비 긍정적인 성장을 보이고 있습니다.',
        action: '현재 콘텐츠 전략을 계속하세요!'
      },
      contentStrategy: {
        title: '콘텐츠 집중 영역',
        description: '가장 인기 있는 주제는 다음과 같습니다: {topics}. 지속적인 성공을 위해 이 영역에 집중하세요.',
        action: '이러한 트렌딩 주제 주변의 콘텐츠를 더 만들어보세요.'
      },
      revenuePotential: {
        title: '강력한 수익 잠재력',
        description: '조회수 기준으로 채널에 상당한 수익화 잠재력이 있습니다.',
        action: '광고 배치를 최적화하고 스폰서십을 탐색해보세요.'
      }
    },
  },

  zh: {
    header: {
      title: 'YouTube 分析',
      channels: '频道',
      analytics: '分析',
      insights: '洞察',
    },
    hero: {
      badge: '由 YouTube Data API 提供支持',
      title: '分析 YouTube 频道',
      titleHighlight: '性能和收入',
      description: '获取任何 YouTube 频道或视频的详细分析、收入估算和赞助估值。发现帮助您了解频道表现和盈利潜力的洞察。',
    },
    form: {
      title: '输入 YouTube URL',
      subtitle: '粘贴任何 YouTube 频道或视频 URL 开始分析',
      placeholder: 'https://www.youtube.com/channel/UC... 或 https://www.youtube.com/watch?v=...',
      analyzeButton: '分析频道',
      analyzingButton: '正在分析频道...',
      supportedFormats: '支持的 URL 格式：',
      channelFormat: '频道：youtube.com/channel/UC...',
      customFormat: '自定义 URL：youtube.com/c/channelname',
      handleFormat: '用户名：youtube.com/@username',
      videoFormat: '视频：youtube.com/watch?v=...',
    },
    kpi: {
      subscribers: '订阅者',
      totalViews: '总观看次数',
      dailyAvgViews: '日均观看次数',
      avgViewsPerVideo: '平均观看次数/视频',
      last30Days: '最近 30 天平均',
      last10Videos: '最近 10 个视频',
    },
    charts: {
      viewsOverTime: '观看次数随时间变化',
      weeklyViewTotals: '最近 90 天的周观看次数总计',
    },
    performance: {
      title: '观看表现',
      subtitle: '最近活动指标',
      days30: '30 天',
      days90: '90 天',
      dailyAverage: '日均',
      recentPerformance: '最近表现',
      quarterlyView: '季度观看',
      last30Days: '最近 30 天',
    },
    revenue: {
      monthlyAdRevenue: '月度广告收入估算',
      yearlyAdRevenue: '年度广告收入估算',
      perVideoSponsorship: '每视频赞助估算',
      conservative: '保守',
      base: '基础',
      aggressive: '激进',
      monthlyTooltip: 'RPM = 每千次观看收入。实际 RPM 因地区、细分市场、广告填充率和观众人口统计而异。',
      yearlyTooltip: '基于 30 天表现的年度收入预测。增长、季节性和算法变化将影响实际结果。',
      sponsorshipTooltip: '赞助 CPM 通常根据平均观看次数在每视频 $5-$30 范围内。实际费率取决于细分市场、观众参与度和品牌匹配度。',
    },
    footer: {
      disclaimer: '这仅是估算。实际 YouTube 收入可能因地区、细分市场、广告填充率、观众人口统计和其他因素而有很大差异。此数据仅用于信息目的。',
    },
    errors: {
      urlRequired: '需要 URL 参数',
      invalidUrl: '请提供有效的 YouTube URL',
      channelNotFound: '未找到频道。请检查 URL 并重试。',
      apiError: 'YouTube API 错误。请检查您的 API 密钥并重试。',
      internalError: '内部服务器错误',
    },
    advancedAnalytics: {
      totalLikes: '总点赞数',
      totalComments: '总评论数',
      engagementRate: '参与率',
      avgVideoDuration: '平均视频时长',
      uploadFrequency: '上传频率',
      trendingTopics: '热门话题',
      allTimeEngagement: '全时段参与度',
      communityInteraction: '社区互动',
      likesCommentsViews: '点赞 + 评论 / 观看次数',
      contentLengthAnalysis: '内容长度分析',
      videosPerWeek: '每周视频数',
      mostUsedTags: '最近视频中最常用的标签',
    },
    enhancedChart: {
      viewsOverTime: '观看次数随时间变化',
      weeklyViewTotals: '最近 90 天的周观看次数总计',
      interactiveViewAnalytics: '交互式观看分析',
      peak: '峰值',
      average: '平均',
      range: '范围',
      line: '线型',
      area: '面积',
      noViewDataAvailable: '无观看数据',
      tryDifferentChannel: '尝试分析其他频道',
    },
    exportData: {
      exportAnalyticsData: '导出分析数据',
      downloadComprehensiveReports: '下载多种格式的综合报告',
      csvExport: 'CSV 导出',
      rawDataSpreadsheet: '用于电子表格分析的原始数据',
      htmlReport: 'HTML 报告',
      formattedReportSharing: '用于分享的格式化报告',
      note: '注意',
      csvExportsInclude: 'CSV 导出包含所有用于分析的原始数据。',
      htmlReportsFormatted: 'HTML 报告已格式化以便轻松分享，可以',
      convertedToPdf: '使用浏览器的打印功能转换为 PDF。',
    },
    refreshButton: {
      refreshing: '刷新中...',
      updated: '已更新！',
      refreshData: '刷新数据',
      lastUpdated: '最后更新',
      justNow: '刚刚',
      minutesAgo: '分钟前',
      hoursAgo: '小时前',
      daysAgo: '天前',
    },
    aiInsights: {
      title: 'AI 智能洞察',
      subtitle: '基于您的频道数据的智能推荐',
      noInsights: '此频道暂无特定洞察',
      disclaimer: {
        title: 'AI 分析',
        description: '这些洞察是通过数据分析算法生成的。结果可能因频道表现和行业基准而异。'
      },
      highEngagement: {
        title: '优秀的参与率',
        description: '您的参与率超过4%，这对大多数频道来说是优秀的表现。',
        action: '继续创作鼓励点赞和评论的内容！'
      },
      lowEngagement: {
        title: '参与率较低',
        description: '您的参与率低于1.5%。考虑提出问题或创建更多互动内容。',
        action: '尝试要求观众点赞、评论或分享您的视频。'
      },
      highFrequency: {
        title: '一致的发布计划',
        description: '您每周发布超过3个视频，这有助于保持观众参与度。',
        action: '保持这种一致性以维持观众参与度。'
      },
      lowFrequency: {
        title: '发布频率低',
        description: '您每周发布少于1个视频。考虑增加发布频率。',
        action: '为了更好的增长，尝试每周至少发布2-3个视频。'
      },
      longVideos: {
        title: '长视频内容',
        description: '您的平均视频长度超过15分钟，适合详细内容。',
        action: '考虑添加时间戳和章节以获得更好的观看体验。'
      },
      shortVideos: {
        title: '短视频内容',
        description: '您的平均视频长度少于5分钟，适合快速消费。',
        action: '考虑创建系列或播放列表以增加观看时间。'
      },
      growingChannel: {
        title: '频道增长趋势',
        description: '您最近的观看次数相比90天平均值显示出积极增长。',
        action: '继续您当前的内容策略！'
      },
      contentStrategy: {
        title: '内容重点领域',
        description: '您最受欢迎的主题包括：{topics}。专注于这些领域以获得持续成功。',
        action: '围绕这些热门主题创作更多内容。'
      },
      revenuePotential: {
        title: '强大的收入潜力',
        description: '根据您的观看次数，您的频道具有重要的变现潜力。',
        action: '考虑优化您的广告位置并探索赞助机会。'
      }
    },
  },
};
