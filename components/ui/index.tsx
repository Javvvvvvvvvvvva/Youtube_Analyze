import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-card transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'gradient-button',
    secondary: 'bg-panel border border-border text-white hover:bg-panel/80 hover:-translate-y-0.5',
    ghost: 'text-muted hover:text-white hover:bg-panel/50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  id?: string;
  required?: boolean;
}

export function Input({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  disabled = false,
  icon,
  className = '',
  id,
  required = false
}: InputProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="pill-input"
      />
      {icon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted">
          {icon}
        </div>
      )}
    </div>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'conservative' | 'base' | 'aggressive' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantClasses = {
    conservative: 'bg-green-500/20 text-green-300 border-green-500/30',
    base: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    aggressive: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    default: 'bg-panel text-muted border-border',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium border ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <div className={className}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
