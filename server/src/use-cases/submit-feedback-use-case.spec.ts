import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy},
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64sgfsfgsd',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit feedback without a type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64sdfgsf',
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without a comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64sgfsgsfgs',
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback with an invalid screenshot ', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: '2121686',
        })).rejects.toThrow();
    })
})