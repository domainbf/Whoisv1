// /server/api/domain-price.post.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        // 调用纳主米API获取域名价格信息
        const response = await fetch('https://www.nazhumi.com/api/v1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                domain: body.domain
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching domain price:', error);
        return {
            error: 'Failed to fetch domain price information'
        };
    }
});
