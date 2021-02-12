import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../client/components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedEntitiesData, EntityListItemData } from '../server/lib/entities.service';
import Date from '../client/components/date';
import { getHomeDescriptionData, HomeDescriptionData } from '../server/lib/home.service';
import { getEntityHref } from '../server/lib/paths.utils';

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<HomeProps, {}> = async () => {
  const allPostsData = getSortedEntitiesData();
  const homeDescriptionData = await getHomeDescriptionData();

  const props: HomeProps = {
    allPostsData,
    homeDescriptionData,
  };
  return {
    props,
  };
};

// noinspection JSUnusedGlobalSymbols
export default function Home(props: HomeProps) {
  const {
    allPostsData = [],
    homeDescriptionData = {
      title: null,
      date: null,
      contentHtml: null,
    },
  } = props;

  return (
    <Layout home siteTitle={ homeDescriptionData.title }>
      <Head>
        <title>
          { homeDescriptionData.title }
        </title>
      </Head>

      <section
        className={ utilStyles.headingMd }
        dangerouslySetInnerHTML={ { __html: homeDescriptionData.contentHtml } }
      />

      <section className={ `${ utilStyles.headingMd } ${ utilStyles.padding1px }` }>
        <h2 className={ utilStyles.headingLg }>
          Blog
        </h2>

        <ul className={ utilStyles.list }>
          { allPostsData.map(PostListItem) }
        </ul>
      </section>
    </Layout>
  );
}

interface HomeProps {
  allPostsData: EntityListItemData[],
  homeDescriptionData: HomeDescriptionData,
}

interface PostListItemProps {
  id: string,
  date: string,
  title: string,
}

function PostListItem({ id, date, title }: PostListItemProps) {
  return (
    <li className={ utilStyles.listItem } key={ id }>
      <Link href={ getEntityHref(id) }>
        <a>
          { title }
        </a>
      </Link>

      <br/>

      <small className={ utilStyles.lightText }>
        <Date dateString={ date }/>
      </small>
    </li>
  );
}
