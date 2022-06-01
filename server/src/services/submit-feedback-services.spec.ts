import { SubmitFeedbackServices } from './submit-feedback-services'

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackServices(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'Bug',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64, 212091201saplspploa21a'
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'This is a bug',
        screenshot: 'data:image/png;base64, 212091201saplspploa21a'
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'Bug',
        comment: '',
        screenshot: 'data:image/png;base64, 212091201saplspploa21a'
      })
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'Bug',
        comment: 'this is a bug',
        screenshot: 'teste.jpg'
      })
    ).rejects.toThrow()
  })
})
