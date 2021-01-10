const redirectUtil = (ctx, path)=>{
    const { res } = ctx;
    if (res) {
      res.writeHead(301, { Location: path });
      res.end();
    }
}

export default redirectUtil
export const redirect = redirectUtil