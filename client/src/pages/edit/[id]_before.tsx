import React, { FC } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getServerSideProps } from "../api/api";
import { Props } from "../../../types/types";
import UserInfoEdit from "../../components/edituser";
import UserSkillEdit from "../../components/editskill";
import UserSkillCreate from "../../components/createskill";
import UserExperienceEdit from "../../components/editexperience";
import UserExperienceCreate from "../../components/createexperience";
import UserPortfolioEdit from "../../components/editeportfolio";
import UserPortfolioCreate from "../../components/createportfolio";
import UserSnsEdit from "../../components/editesns";
import UserSnsCreate from "../../components/createsns";

const UserEdit: FC<Props> = ({
  userInfo,
  userImage,
  userSkill,
  skillLevel,
  userExperience,
  experienceCategory,
  year,
  month,
  userPortfolio,
  userSns,
  snsType,
}) => {
  return (
    <div className={styles.container}>
      <UserInfoEdit userInfo={userInfo} userImage={userImage} />
      <UserSkillEdit userSkill={userSkill} skillLevel={skillLevel} />
      <UserSkillCreate userSkill={userSkill} skillLevel={skillLevel} />
      <UserExperienceEdit
        userExperience={userExperience}
        experienceCategory={experienceCategory}
        year={year}
        month={month}
      />
      <UserExperienceCreate
        userExperience={userExperience}
        experienceCategory={experienceCategory}
        year={year}
        month={month}
      />
      <UserPortfolioEdit userPortfolio={userPortfolio} />
      <UserPortfolioCreate userPortfolio={userPortfolio} />
      <UserSnsEdit userSns={userSns} snsType={snsType} />
      <UserSnsCreate userSns={userSns} snsType={snsType} />

      <button className="userpage_btn">
        <Link href={`/userpage/${userInfo.id}`}>ユーザーページに戻る</Link>
      </button>
    </div>
  );
};

export { getServerSideProps };
export default UserEdit;
