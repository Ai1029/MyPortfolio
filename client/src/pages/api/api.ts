import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

// ユーザー情報を取得する;
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  try {
    if (!params?.id) {
      console.error("ユーザー情報がありません");
      return {
        props: {
          userInfo: null,
          userImage: null,
          userSkill: null,
          skillLevel: null,
          userExperience: null,
          experienceCategory: null,
          year: null,
          month: null,
          userPortfolio: null,
          userSns: null,
          snsType: null,
        },
      };
    } else {
      // ユーザー情報を取得
      const userRes = await axios.get(
        `http://server:3001/api/v1/user/${params.id}`
      );
      console.log("ユーザー情報ゲット", userRes);

      // ユーザー情報からユーザーIDを取得
      const userID = userRes.data.id;
      console.log("ユーザーIDゲット", userID);

      // ユーザーIDを使用して関連する画像データを取得
      const userImageRes = await axios.get(
        `http://server:3001/api/v1/userimg/${userID}`
      );
      console.log("画像データゲット", userImageRes);

      // ユーザーIDを使用して関連するスキルを取得
      const skillRes = await axios.get(
        `http://server:3001/api/v1/skill/${userID}`
      );
      console.log("スキルゲット", skillRes);

      // スキルレベルを取得
      const skilllevelRes = await axios.get(
        `http://server:3001/api/v1/skilllevel`
      );
      console.log("スキルレベルをゲット", skilllevelRes);

      // ユーザーIDを使用して関連する経験を取得
      const experienceRes = await axios.get(
        `http://server:3001/api/v1/experience/${userID}`
      );
      console.log("経験ゲット", experienceRes);

      // experienceCategoryを取得
      const experienceCategoryRes = await axios.get(
        `http://server:3001/api/v1/experiencecategory`
      );
      console.log("経験のカテゴリーゲット", experienceCategoryRes);

      // yearを取得
      const yearRes = await axios.get(`http://server:3001/api/v1/year`);
      console.log("年ゲット", yearRes);

      // monthを取得
      const monthRes = await axios.get(`http://server:3001/api/v1/month`);
      console.log("月ゲット", monthRes);

      // ユーザーIDを使用して関連するポートフォリオとポートフォリオ画像を取得
      const portfolioRes = await axios.get(
        `http://server:3001/api/v1/portfolio/${userID}`
      );
      console.log("ポートフォリオゲット", portfolioRes);

      // ユーザーIDを使用して関連するSNSを取得
      const snsRes = await axios.get(`http://server:3001/api/v1/sns/${userID}`);
      console.log("SNSゲット", snsRes);

      // SNSの種類を取得
      const snstypeRes = await axios.get(`http://server:3001/api/v1/typeofsns`);
      console.log("SNSの種類ゲット", snstypeRes);

      return {
        props: {
          userInfo: userRes.data,
          userImage: userImageRes.data,
          userSkill: skillRes.data,
          skillLevel: skilllevelRes.data,
          userExperience: experienceRes.data,
          experienceCategory: experienceCategoryRes.data,
          year: yearRes.data,
          month: monthRes.data,
          userPortfolio: portfolioRes.data,
          userSns: snsRes.data,
          snsType: snstypeRes.data,
        },
      };
    }
  } catch (err) {
    console.error(err);
    return {
      props: {
        userInfo: null,
        userImage: null,
        userSkill: null,
        skillLevel: null,
        userExperience: null,
        experienceCategory: null,
        year: null,
        month: null,
        userPortfolio: null,
        userSns: null,
        snsType: null,
      },
    };
  }
};
