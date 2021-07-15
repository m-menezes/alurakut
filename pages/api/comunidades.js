import { SiteClient } from 'datocms-client';

export default async function requisitor(request, response) {
    if (request.method === "POST") {
        const TOKEN = 'a03b4c547537544632b522f876c902';
        const client = new SiteClient(TOKEN);
        
        const registroCriado = await client.items.create({
            itemType: "972012", //Model ID
            ...request.body,
        })

        response.json({
            registro: registroCriado,
        });
        return;
    } else {
        response.status(400).json({ message: 'Método incorreto!!' });
    }
}