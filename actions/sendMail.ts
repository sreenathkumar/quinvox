'use server'
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_SEVER_API_KEY!);


async function sendMail(formData: FormData) {
    // return {
    //     success: true,
    //     message: 'Mail sent successfully'
    // }
}


export { sendMail }