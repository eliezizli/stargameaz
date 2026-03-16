export default async function handler(req, res) {
    const { id } = req.query;
    
    // Daha stabil işləyən alternativ Midasbuy API linki
    const url = `https://www.midasbuy.com/api/check/ig/id?id=${id}&appId=10000`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'https://www.midasbuy.com',
                'Referer': 'https://www.midasbuy.com/',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
            }
        });

        const data = await response.json();

        // Midasbuy cavabını daha dəqiq analiz edirik
        if (data && data.name) {
            return res.status(200).json({ name: data.name });
        } else if (data && data.ret === 0 && data.info) {
            // Bəzi regionlarda ad 'info' obyektinin içində gəlir
            return res.status(200).json({ name: data.info.name || data.info.nickname });
        } else {
            return res.status(200).json({ name: null, msg: "Tapılmadı" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Sistem xətası" });
    }
}
