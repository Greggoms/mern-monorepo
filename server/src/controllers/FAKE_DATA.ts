import { Product } from "../interfaces/db/Product";
import { PurchaseDetails } from "../interfaces/PurchaseDetails";

export const products: Product[] = [
  {
    id: "r4nD0mid",
    name: "Item One",
    description: "",
    price: 0.55,
  },
  {
    id: "239018kedm32",
    name: "Item Two",
    description: "",
    price: 5.45,
  },
  {
    id: "g6985tr1hrt",
    name: "Item Three",
    description: "",
    price: 2,
  },
  {
    id: "ytjb5ru65ru65",
    name: "Item Four",
    description: "",
    price: 9.99,
  },
  {
    id: "ytjb764w5ik876",
    name: "Item Five",
    description: "",
    price: 14.99,
  },
  {
    id: "kjl;ng=230ifg",
    name: "Item Six",
    description: "",
    price: 59.99,
  },
  {
    id: "u7659hj45gi6k",
    name: "Item Seven",
    description: "",
    price: 12.99,
  },
  {
    id: "bghtj8l097786ok",
    name: "Item Eight",
    description: "",
    price: 3.14,
  },
  {
    id: "hl98o066r7kk7yt",
    name: "Item Nine",
    description: "",
    price: 7.89,
  },
  {
    id: "78t6jhi8o755768",
    name: "Item Ten",
    description: "",
    price: 10.0,
  },
  {
    id: "o;kin[g0945j4g",
    name: "Item Eleven",
    description: "",
    price: 11.11,
  },
  {
    id: "plkfjm4940h89h5y",
    name: "Item Twelve",
    description: "",
    price: 12.34,
  },
];

export const purchases: PurchaseDetails[] = [
  {
    id: "purchase-1-id",
    promo: "some-promo-id",
    products: products.slice(0, 4),
  },
  {
    id: "purchase-2-id",
    promo: "",
    products: products.slice(4, 7),
  },
  {
    id: "purchase-3-id",
    promo: "some-promo-id",
    products: products.slice(7, 13),
  },
];
