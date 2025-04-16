import RenderEmoji from "./RenderEmoji";

const ParseEmojiList = ({listEmoji}) => {
        return (
            <>
                {listEmoji.map((ele, index) => {
                    return (
                        <RenderEmoji emojiImage={ele} key={index}/>
                    )
                })}
            </>
        )

}

export default ParseEmojiList;