import { InferInsertModel } from "drizzle-orm";
import { books } from "./db/schema";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  isLoanedBook?: boolean;
}

interface AuthCredentials {
  email:string;
  password:string;
  fullName:string;
  universityNumber:number;
  universityCard:string;
}  

type BookParams = InferInsertModel<typeof books>
