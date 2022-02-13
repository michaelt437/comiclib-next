import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Comicbook } from "../types";
import supabase from "../supabase";
import Layout from "../components/Layout/Layout";

export const getStatisProps: GetStaticProps = async () => {
  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .order("title", { ascending: true });
  return {
    props: {
      wishlistData: data
    }
  };
};

export default function Wishlist ({
  wishlistData
}: {
  wishlistData: Partial<Comicbook>[];
}) {
  const [wishlist, setWishlist] = useState<Partial<Comicbook>[]>([]);
  useEffect(() => {
    async function fetchWishlist (): Promise<void> {
      const { data, error } = await supabase
        .from("wishlist")
        .select("*")
        .order("title", { ascending: true });
      setWishlist(data as Partial<Comicbook>[]);
    }
    fetchWishlist();
  }, []);

  return (
    <Layout>
      <h2>Hello, Wishlist World</h2>
      {wishlist.map((comic) => {
        return <div key={comic.title}>{comic.title}</div>;
      })}
    </Layout>
  );
}
