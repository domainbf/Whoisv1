export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        // 使用新的 whois_extract API
        const response = await fetch('https://who.cx/api/whois_extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                domain: body.domain
            })
        });
        const data = await response.json();
        
        if (!data || Object.keys(data).length === 0) {
            return getDefaultWhoisResponse(body.domain);
        }
        return data;
    } catch (error) {
        console.error('Error fetching whois data:', error);
        return getDefaultWhoisResponse(body.domain);
    }
});

function getDefaultWhoisResponse(domain: string) {
    return `No match for "${domain}".\n` +
        `>>> Last update of whois database: ${new Date()} <<<\n` +
        // ... 其余默认响应文本保持不变 ...
        'The Registry database contains ONLY .COM, .NET, .EDU domains and\n' +
        'Registrars.';
}
