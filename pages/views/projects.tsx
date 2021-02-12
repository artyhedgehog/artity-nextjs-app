import Layout, { SiteTitleProvider } from '../../components/layout';
import React from 'react';
import { GetServerSideProps } from 'next';
import { getHomeDescriptionData } from '../../server/lib/home.service';
import { EntityListItemData, getSortedEntitiesData } from '../../server/lib/entities.service';
import { getEntityHref } from '../../server/lib/paths.utils';

interface ProjectsPageProps extends SiteTitleProvider {
  projects: EntityListItemData[]
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async () => {
  const projects = await getSortedEntitiesData({ isProject: true });
  const { title } = await getHomeDescriptionData();

  return ({
    props: {
      siteTitle: title,
      projects,
    },
  });
};

function ProjectItem({ id, title }: EntityListItemData) {
  return (
    <section>
      <a href={ getEntityHref(id) }>
        <h2>
          { title }
        </h2>
      </a>
    </section>
  );
}

// noinspection JSUnusedGlobalSymbols
export default function ProjectsPage({ siteTitle, projects }: ProjectsPageProps) {
  return (
    <Layout siteTitle={ siteTitle }>
      { projects.map(ProjectItem) }
    </Layout>
  );
}
