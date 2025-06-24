export interface Article {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export interface IFormArticle {
  title?: string;
  categoryId: string;
  content?: string;
  imageUrl?: File[];
}
