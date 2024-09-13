import { sendContactEmail, sendSuccessResponse } from "../helpers/index.js";

export const getBaseRoute = async (req, res) => {
  return res.send({
    success: true,
    message: "Hello! philipthedeveloper backend system says hi!👋",
  });
};

export const sendNewMessage = async (req, res) => {
  await sendContactEmail(req.body);
  return sendSuccessResponse(res, {
    message: "Your message has been delivered.",
  });
};
