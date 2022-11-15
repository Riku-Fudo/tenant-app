// jsonの型
type Item = {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    deleted?: boolean;
  };

export async function FetchData(data: Item, method:string) {
let url = '';
if(data.id){    
    url = `http://localhost:8000/items/${data.id}`;
}else{
    url = 'http://localhost:8000/items';
}
await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
