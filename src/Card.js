export default function Card(props) {
  const { character } = props;

  return (
    <div className="card">
      <img
        src={character.images[0] != null ? character.images[0] : 'dummy.png'}
        className="card-image"
        alt="character image"
      />
      <div className="card-content">
        <h3 className="card-title">{character.name}</h3>
        <p className="card-description">
          {character.debut?.appearsIn ?? 'なし'}
        </p>
        <div className="card-footer">
          <span className="affiliation">
            {character.personal?.affiliation ?? 'なし'}
          </span>
        </div>
      </div>
    </div>
  );
}
