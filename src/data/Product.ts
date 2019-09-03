export interface Product {
    "id": string,
    "colour"?: {
        "color": string,
        "title": string
    },
    "brand"?: string,
    "discount"?: number,
    "rating"?: number,
    "image"?: string,
    "price"?: {
        "mrp"?: number
        "final_price"?: number
    },
    "title"?: string
}