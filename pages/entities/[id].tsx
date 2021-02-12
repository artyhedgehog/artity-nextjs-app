import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import Layout from '../../components/layout';
import {
  getAllEntitiesIds,
  getEntityData,
  EntityIdParams,
  EntityData,
} from '../../server/lib/entities.service';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { getHomeDescriptionData } from '../../server/lib/home.service';

// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths<EntityIdParams & ParsedUrlQuery> = async () => {
  const paths = getAllEntitiesIds();

  return {
    paths,
    fallback: false,
  };
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<EntityProps, EntityIdParams> = async ({ params }) => {
  const siteData = await getHomeDescriptionData();
  const postData = await getEntityData(params.id);

  const props: EntityProps = { postData, siteTitle: siteData.title };

  return { props };
};

interface EntityProps {
  postData: EntityData;
  siteTitle: string;
}

// noinspection JSUnusedGlobalSymbols
export default function Entity({ postData, siteTitle }: EntityProps) {
  return (
    <Layout siteTitle={ siteTitle }>
      <Head>
        <title>
          { postData.title }
        </title>
      </Head>

      <article>
        <h1 className={ utilStyles.headingXl }>
          { postData.title }
        </h1>

        <div className={ utilStyles.lightText }>
          <Date dateString={ postData.date }/>
        </div>

        <div dangerouslySetInnerHTML={ { __html: postData.contentHtml } }/>
      </article>
    </Layout>
  );
}
