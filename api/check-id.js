export default async function handler(req, res) {
    const { id } = req.query;
    
    // Midasbuy bəzən xüsusi başlıqlar (headers) tələb edir
    const url = `https://www.midasbuy.com/api/check/ig/id?id=${id}&appId=10000`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const data = await response.json();

        // Midasbuy-dan gələn cavabı yoxlayırıq
        if (data.ret === 0 || data.name) {
            res.status(200).json({ name: data.name });
        } else {
            // Əgər Midasbuy "tapılmadı" deyirsə
            res.status(200).json({ name: null, message: "Oyunçu tapılmadı" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server xətası", details: error.message });
    }
}
