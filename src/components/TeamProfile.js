import React from 'react'

function TeamProfileCard({ className, name, children, githubUrl, twitterUrl, linkedinUrl }) {
  return (
    <div className={className}>
      <div className="card card--full-height">
        <div className="card__header">
          <div className="avatar avatar--vertical">
            <img className="avatar__photo avatar__photo--xl" src={githubUrl + '.png'} alt={`${name}'s avatar`} />
            <div className="avatar__intro">
              <h3 className="avatar__name">{name}</h3>
            </div>
          </div>
        </div>
        <div className="card__body">{children}</div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            {githubUrl && (
              <a className="button button--secondary" href={githubUrl}>
                GitHub
              </a>
            )}
            {linkedinUrl && (
              <a className="button button--secondary" href={linkedinUrl}>
                LinkedIn
              </a>
            )}
            {twitterUrl && (
              <a className="button button--secondary" href={twitterUrl}>
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function TeamProfileCardCol(props) {
  return <TeamProfileCard {...props} className={'col col--6 margin-bottom--lg'} />
}

export function TeamRow({ data }) {
  console.log({ data })
  return (
    <div className="row">
      {data.map((item) => (
        <TeamProfileCardCol
          key={item.name}
          name={item.name}
          linkedinUrl={item.linkedinUrl}
          githubUrl={item.githubUrl}
          twitterUrl={item.twitterUrl}
        >
          <p>{item.description}</p>
        </TeamProfileCardCol>
      ))}
    </div>
  )
}
