import { SendMailData } from './../mail-adapter';
import { MailAdapter } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "80032db8bc25e1",
      pass: "6cf6406895721a"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>', 
            to: 'Gabriel Camargo <contato@gabrielcamargo.dev>',
            subject,
            html: body,
        })
    
    };
}