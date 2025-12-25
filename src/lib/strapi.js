
   const API_URL =
     process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';

   async function fetchFromCMS(path, { query = {} } = {}) {
     const url = new URL(`/api/${path}`, API_URL);

     // Default: populate all relations/media unless caller overrides
     if (!('populate' in query)) {
       query.populate = '*';
     }

     Object.entries(query).forEach(([key, value]) => {
       url.searchParams.set(key, value);
     });

     const res = await fetch(url.toString());
     if (!res.ok) {
       throw new Error(`CMS error ${res.status}: ${await res.text()}`);
     }

     const json = await res.json();
     return json.data; // Strapi v5 structure
   }

   export { fetchFromCMS };
