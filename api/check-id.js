export default async function handler(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "ID lazımdır" });

    try {
        // Midasbuy-ın rəsmi yoxlama linkinə sorğu atırıq
        const response = await fetch(`https://www.midasbuy.com/api/check/ig/id?id=${id}&appId=10000`);
        const data = await response.json();
        
        // Midasbuy-dan gələn cavabı sənin saytına ötürürük
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Sistem xətası" });
    }
}
