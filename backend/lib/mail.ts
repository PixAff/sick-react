import { createTransport } from "nodemailer";

const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
})

function makeEmail(text: string) {
    return `
      <div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
      ">
        <h2>Hello There!</h2>
        <p>${text}</p>
  
        <p>😘, Stefan</p>
      </div>
    `;
  }

export async function sendMail(resetToken: string, to: string): Promise<void> {
    const info = await transport.sendMail({
        to: to,
        from: "Stefan",
        subject: "Reset Token",
        html: makeEmail(`Your Password Reset Token is here!
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
      `),
    })
    console.log(info);
    
}