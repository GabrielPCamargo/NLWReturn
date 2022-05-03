import { CloseButton } from '../../CloseButton';
import { ArrowLeft, Camera } from 'phosphor-react';
import { FeedbackType, feedbackTypes } from '../../WidgetForm';
import { ScreenshotButton } from '../../WidgetForm/ScreenshotButton';
import { FormEvent, useState } from 'react';

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('');

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleSubmitFeedback(e: FormEvent) {
        e.preventDefault();
        console.log({screenshot, comment});
        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button type="button" onClick={onFeedbackRestartRequested}>
                    <ArrowLeft weight="bold" className="w-4 h-4 top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea 
                    className="min-w-[384px] w-full main-h-[112px] text-sm placeholder-zinc-400 text-zinc-400 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-2 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={(e) => setComment(e.target.value)}
                />

                <footer className="flex mt-2 w-full">
                    <ScreenshotButton 
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />
                    <button
                        type="submit"
                        disabled={comment.length === 0}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-980 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"

                    >
                        Enviar Feedback
                    </button>
                </footer>
            </form>
        </>
    )
}