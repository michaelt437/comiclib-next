import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Comicbook } from "../types";
import supabase from "../supabase";
import Layout from "../components/Layout/Layout";
import WishlistTable from "../components/WishlistTable/WishlistTable";

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
  const [wishlist, setWishlist] = useState<Comicbook[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function fetchWishlist (): Promise<void> {
      const { data, error } = await supabase
        .from("wishlist")
        .select("*")
        .order("title", { ascending: true });
      setWishlist(data as Partial<Comicbook>[]);
    }
    async function checkAuth (): Promise<void> {
      const user = (await supabase.auth.user()) as User;
      if (user?.role) setAuthenticated(user.role === "authenticated");
    }
    fetchWishlist();
    checkAuth();
  }, []);

  return (
    <Layout>
      <WishlistTable items={wishlist} auth={authenticated} />
    </Layout>
  );
}
