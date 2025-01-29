// utils/translations.js
export const statusTranslations = {
    "Prohibited String - Domain Cannot Be Registered": "保留域名 - 无法注册",
    "Active": "激活",
    "Pending": "待定",
    "Expired": "已过期",
    // Add more status codes and translations as needed
};

export function translateStatus(statusCode) {
    return statusTranslations[statusCode] || statusCode;
}
