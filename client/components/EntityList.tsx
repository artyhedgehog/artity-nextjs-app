import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import utilStyles from '../../styles/utils.module.css';
import { getEntityHref } from '../../server/lib/paths.utils';
import { AppState } from '../../redux/store';
import DateViewer from './DateViewer';

const EntityList: FC = () => {
  const query = useSelector((state: AppState) => state.ui.search.query || '');
  const allEntitiesData = useSelector((state: AppState) => state.data.searchedEntities[query]);

  if (!allEntitiesData) {
    return (<div>No entities found</div>)
  }

  return (
      <ul className={ utilStyles.list }>
        { allEntitiesData.map(EntityListItem) }
      </ul>
  );
};

export default EntityList;

interface PostListItemProps {
  id: string,
  date: string,
  title: string,
}

function EntityListItem({ id, date, title }: PostListItemProps) {
  return (
      <li className={ utilStyles.listItem } key={ id }>
        <Link href={ getEntityHref(id) }>
          <a>
            { title }
          </a>
        </Link>

        <br/>

        <small className={ utilStyles.lightText }>
          <DateViewer dateString={ date }/>
        </small>
      </li>
  );
}

