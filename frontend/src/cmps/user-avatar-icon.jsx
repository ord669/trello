export function UserAvatarIcon({ member }) {
    const userStyle = {
        backgroundImage: `url(${member.imgUrl})`
    }
    return (
        <section style={userStyle} className='user-avatar-icon'>
        </section>
    )
}