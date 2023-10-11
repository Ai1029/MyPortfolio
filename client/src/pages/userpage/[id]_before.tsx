import router, { useRouter } from "next/router";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import styles from "../styles/Home.module.css";
import { getServerSideProps } from "../api/api";
import { skill, Props } from "../../../types/types";
import axios from "axios";

const Userpage: FC<Props> = ({
  userInfo,
  userImage,
  userSkill,
  userExperience,
  userPortfolio,
  userSns,
}) => {
  const router = useRouter();
  console.log(router.query.id);
  console.log("userInfo", userInfo);
  console.log("userImage", userImage);
  console.log("userPortfolio", userPortfolio);
  console.log("userSns", userSns);
  console.log("userSkill", userSkill);

  const signout = () => {
    signOut(auth)
      .then(async () => {
        console.log("ユーザーがサインアウトしました");
        const url = `http://localhost:3000/signin`;
        router.push(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <h2>MyPortfolio</h2>

      <div>
        <>
          <img src={userImage.url} />
          <p>{userInfo.name}</p>
          <p>{userInfo.introduction}</p>
          <p>{userInfo.hobby}</p>
        </>
      </div>
      <div>
        <h2>Skill</h2>
        {userSkill.length > 0 ? (
          userSkill.map((skill) => (
            <>
              <p>{skill.name}</p>
              <p>{skill.description}</p>
              <p>{skill.skilllevel.level}</p>
            </>
          ))
        ) : (
          <p>スキルは準備中です</p>
        )}
      </div>
      <div>
        <h2>Experience</h2>
        {userExperience.length > 0 ? (
          userExperience.map((experience) => (
            <>
              <p>{experience.name}</p>
              <p>{experience.description}</p>
            </>
          ))
        ) : (
          <p>職務経歴は準備中です</p>
        )}
      </div>

      <div>
        <h2>Portfolio</h2>
        {userPortfolio.length > 0 ? (
          userPortfolio.map((portfolio) => (
            <>
              <p>{portfolio.name}</p>
              <p>{portfolio.description}</p>
              <p>{portfolio.url}</p>
              {portfolio.image && <img src={portfolio.image.url} />}
            </>
          ))
        ) : (
          <p>portfolioは準備中です</p>
        )}
      </div>
      <div>
        <h2>Socials & Links</h2>
        {userSns.length > 0 ? (
          userSns.map((sns) => (
            <>
              <p>{sns.typeofSNS.typeofSNS}</p>
              <p>{sns.url}</p>
            </>
          ))
        ) : (
          <p>SNSは準備中です</p>
        )}
      </div>
      <button type={"submit"}>
        <Link href={`/edit/${userInfo.id}`}>編集</Link>
      </button>
      <button type={"submit"} onClick={signout}>
        サインアウト
      </button>
    </div>
  );
};

export { getServerSideProps };
export default Userpage;
