import { whois } from "~/server/whois/whois";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        const res = await whois(body.domain);
        if (res._raw.trim() === "") {
            // 如果获取不到域名数据，返回提示信息
            return {
                message: "无法获取域名信息，请重试。",
                data: null
            };
        }
        return {
            message: "",
            data: res._raw
        };
    } catch (e) {
        return {
            message: "无法获取域名信息，请重试。",
            data: null
        };
    }
});
