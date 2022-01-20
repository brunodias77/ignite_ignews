import Head from "next/head";
import styles from "./styles.module.scss";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de maio de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Molestias cum minus ea ratione dolore, dignissimos, dolorum
              facilis adipisci ipsam voluptas reiciendis aut quos! Nihil vitae
              voluptatum totam optio, dicta enim.
            </p>
          </a>
          <a href="#">
            <time>12 de maio de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Molestias cum minus ea ratione dolore, dignissimos, dolorum
              facilis adipisci ipsam voluptas reiciendis aut quos! Nihil vitae
              voluptatum totam optio, dicta enim.
            </p>
          </a>
          <a href="#">
            <time>12 de maio de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Molestias cum minus ea ratione dolore, dignissimos, dolorum
              facilis adipisci ipsam voluptas reiciendis aut quos! Nihil vitae
              voluptatum totam optio, dicta enim.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "Post")],
    { fetch: ["Post.title", "Post.content"], pageSize: 100 }
  );
  console.log(JSON.stringify(response, null, 2));
  return {
    props: {},
  };
};
