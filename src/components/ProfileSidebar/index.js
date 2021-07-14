import Box from '../Box'
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';
function ProfileSidebar(propriedades) {
    return (
      <Box as="aside">
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
        <hr/>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          {propriedades.githubUser}
        </a>
        <div className="description">
              <p>Masculino,</p>
              <p>Solteiro(a)</p>
              <p>Brasil</p>
        </div>
        <hr/>
        <AlurakutProfileSidebarMenuDefault/>
      </Box>
    )
}
export default ProfileSidebar;