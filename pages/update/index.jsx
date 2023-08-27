import Link from "next/link";
import styles from "../../styles/update.module.css";
import { notify_error, notify_info } from "@/lib/notify";
import Loader from '@/public/loader.svg';

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DELAY = 200;
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/user/route`, {
    method: 'GET',
    headers: {
      'authorization': process.env.USER_ACCESS_TOKEN
    }
  });
  const data = await res.json();
  return {
    props: { users: data }
  }
}
const Update = ({ users }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleRefresh = () => {
    router.reload();
  }
  const handleDelete = async () => {
    if (list.length == 0) {
      return notify_error('No Users Selected');
    }
    if (session.user.isAdmin == false) {
      return notify_error('Not Applicable');
    }
    setLoading(true);
    setDisableButton(true);
    const res = await fetch('api/delete/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': session.user.accessToken
      },
      body: JSON.stringify({ list })
    });
    if (res.ok) {
      const data = await res.json();
      if (data) {
        data.forEach(user => {
          notify_info(`${user.username} Deleted`);
        });
        handleRefresh();
      }
    } else {
      const retryAfter = await res.json();
      notify_error(`Too Many Attemps - Retry After ${Math.ceil(retryAfter / 1000)} seconds`, retryAfter);
      setTimeout(() => {
        setLoading(false);
        setDisableButton(false);
      }, retryAfter + DELAY);
    }

  }
  const listRemove = (list, element) => {
    return list.filter((ele) => {
      return ele != element;
    });
  }
  const listAdd = (list, element) => {
    return list.push(element);
  }
  const handleClick = (e) => {
    const id = e.target.closest('#users').getAttribute('key-id');
    console.log(typeof list);
    if (list.includes(id)) {
      setList(list => [...listRemove(list, id)]);
      e.target.style.borderLeft = '8px solid #4979ff';
    } else {
      setList(list => [...list, id]);
      e.target.style.borderLeft = '8px solid #ffb545';
    }
  }
  return (
    <div>
      <Link className={styles.button} href='/update/register'>Register User</Link>
      <button
        id='delete'
        className={styles.button}
        disabled={disableButton}
        onClick={handleDelete}
      >
        {loading ? <Loader className={styles.spinner} /> : 'Delete'}
      </button>
      <div className={styles.wrap}>
        {users.map(user => {
          if (user) {
            return <div
              id='users'
              className={styles.single}
              key-id={user.id}
              key={user.id}
              onClick={(e) => handleClick(e)}
            >
              {user.username}
            </div>
          }
        })}
      </div>
    </div>

  );
}

export default Update;