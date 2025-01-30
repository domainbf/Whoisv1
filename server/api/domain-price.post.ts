export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        const response = await fetch('https://who.cx/api/price', {
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
