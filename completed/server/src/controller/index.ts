import jwt, { JwtPayload } from 'jsonwebtoken';
import DB from "../DB";
import { Request, Response, NextFunction } from 'express';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  const userInfo = DB.filter(item => item.email === email)[0];
  if (!userInfo) {
    res.status(403).json("Not Authorized");
  } else {
    try {
      // access 토큰 발급
      const accessToken = jwt.sign(
        {
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email
        },
        "access-secret", // secret-key : .env에 관리를 하는 것을 추천
        {
          expiresIn: '10s', // 유효기간
          issuer: 'my-self' // 발급자
        });
      // refresh 토큰 발급
      const refreshToken = jwt.sign(
        {
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email
        },
        "refresh-secret", // secret-key : .env에 관리를 하는 것을 추천
        {
          expiresIn: '24h', // 유효기간 : access token 보다 유효기간이 길어야한다.
          issuer: 'my-self' // 발급자
        });
      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true
      });
      res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true
      });
      res.status(200).json("login success");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  next();
};
export const accessToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;
    const data: JwtPayload = jwt.verify(token, 'access-secret') as JwtPayload;
    const userData = DB.filter(item => {
      return item.email === data.email;
    })[0];
    const {password, ...others} = userData;
    res.status(200).json(others);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const refreshToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    const data: JwtPayload = jwt.verify(token, 'refresh-secret') as JwtPayload;
    const userData = DB.filter(item => item.email === data.email)[0];

    const accessToken = jwt.sign(
      {
        id: userData.id,
        username: userData.username,
        email: userData.email
      },
      "access-secret", // secret-key : .env에 관리를 하는 것을 추천
      {
        expiresIn: '10s', // 유효기간
        issuer: 'my-self' // 발급자
      });
    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true
    });
    res.status(200).json("Access Token Recreated");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const loginSuccess = (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;
    const data: JwtPayload = jwt.verify(token, 'access-secret') as JwtPayload;

    const userData = DB.filter(item=>{
      return item.email === data.email;
    })[0];

    res.status(200).json(userData);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie('accessToken', '');
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
};


