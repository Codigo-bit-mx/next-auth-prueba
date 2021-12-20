import NextAuth            from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import ModeloUsuarios      from '../../../models/usuarios';
import conexionBD          from '../../../config/conexionBD';


export default async function auth(req, res) {

    const providers = [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'email', type: 'email'},
                password: {label: 'password', type: 'password'}
            },
        
            async authorize(credentials, res, req) {
                
                await conexionBD().catch(err => `Error en la conexion ${err}`);
                const usuario = await ModeloUsuarios.findOne({ 'email': credentials.email });
                
                if (!usuario) {
                    console.log('Usuario No existe');
                    throw new Error(' Usuario no existe ');
                  }
          
                  if(usuario.activo === 'false'){
                    throw new Error('El usuario no existe o esta inactivo')
                  }
                  
                  return usuario;
                    
                }
        }),
    ]

    return await NextAuth( req, res, {
        providers,

        async jwt(token, account) {
            if(account){
              token.accessToken = account.access_token 
            }
            // console.log("soy el token", token)
            return token
          },
      
          async session (session, user) {
           console.log("soy la session en nextauth", session);
           return session; 
          }
        
    })
}




