/**
 * 时间格式化工具函数
 */

//将ISO格式时间转换为正常格式
export const formatTime = (isoTime: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  if (!isoTime) return '';

  const date = new Date(isoTime);

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

//
export const getRelativeTime = (isoTime: string): string => {
  if (!isoTime) return '';

  const date = new Date(isoTime);
  const now = new Date();

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return '';
  }

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '刚刚';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}分钟前`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}小时前`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}天前`;
  } else {
    return formatTime(isoTime, 'YYYY-MM-DD');
  }
};

//将时间戳转换为正常格式
export const formatTimestamp = (timestamp: number, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  if (!timestamp) return '';

  const date = new Date(timestamp);

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return '';
  }

  return formatTime(date.toISOString(), format);
};


/**
 * 使用示例：
 * 
 * // 基本格式化
 * formatTime('2025-07-12T13:50:04.650Z') 
 * // 输出: "2025-07-12 13:50:04"
 * 
 * // 自定义格式
 * formatTime('2025-07-12T13:50:04.650Z', 'YYYY年MM月DD日 HH:mm')
 * // 输出: "2025年07月12日 13:50"
 * 
 * // 相对时间
 * getRelativeTime('2025-07-12T13:50:04.650Z')
 * // 输出: "刚刚" 或 "5分钟前" 等
 * 
 * // 时间戳格式化
 * formatTimestamp(1640995200000, 'YYYY-MM-DD')
 * // 输出: "2022-01-01"
 * 
 * // 检查是否为今天
 * isToday('2025-07-12T13:50:04.650Z')
 * // 输出: true 或 false
 */