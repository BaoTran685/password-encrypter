import Link from "next/link";
import styles from "../../styles/update.module.css";
import { notify_error, notify_info } from "@/lib/notify";
import { useSession } from "next-auth/react";

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
  var list = [];
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (list.length == 0) {
      return notify_error('No Users Selected');
    }
    if (session.user.isAdmin == false) {
      return notify_error('Not Applicable');
    }
    const res = await fetch('api/delete/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': session.user.accessToken
      },
      body: JSON.stringify({ list })
    })
    const data = await res.json();
    data.forEach(user => {
      notify_info(`${user.username} Deleted`)
    })
  }
  const listRemove = (list, element) => {
    return list.filter((ele) => {
      return ele != element;
    });
  }

  const handleClick = (e) => {
    const id = e.target.closest('#users').getAttribute('key-id');
    if (list.includes(id)) {
      list = listRemove(list, id);
      e.target.style.borderLeft = '8px solid #4979ff';
    } else {
      list.push(id);
      e.target.style.borderLeft = '8px solid #ffb545';
    }
  }
  return (
    <div>
      <Link className={styles.button} href='/update/register'>Register User</Link>
      <button className={styles.button} onClick={handleDelete}>Delete</button>
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