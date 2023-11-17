export interface Card {
    id: number;
    name?: string;//doldurulması zorunlu olmayanlara ? konulabilir.
    title: string;
    phone: string;
    email?: string;
    address?: string;
}
