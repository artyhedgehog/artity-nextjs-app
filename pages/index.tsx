import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../client/components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedEntitiesData, EntityListItemData } from '../server/lib/entities.service';
import DateViewer from '../client/components/DateViewer';
import { getHomeDescriptionData, HomeDescriptionData } from '../server/lib/home.service';
import { getEntityHref } from '../server/lib/paths.utils';
import EntityList from '../client/components/EntityList';

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<HomeProps, {}> = async () => {
  const allEntitiesData = getSortedEntitiesData();
  const homeDescriptionData = await getHomeDescriptionData();

  const props: HomeProps = {
    allEntitiesData: allEntitiesData,
    homeDescriptionData,
  };
  return {
    props,
  };
};

// noinspection JSUnusedGlobalSymbols
export default function Home(props: HomeProps) {
  const {
    allEntitiesData = [],
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

      <main className={ `${ utilStyles.headingMd } ${ utilStyles.padding1px }` }>
        <h2 className={ utilStyles.headingLg }>
          Entities
        </h2>

        <EntityList />
      </main>
    </Layout>
  );
}

interface HomeProps {
  allEntitiesData: EntityListItemData[],
  homeDescriptionData: HomeDescriptionData,
}

