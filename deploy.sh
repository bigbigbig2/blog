yarn build
cd dist
echo www.luxd.space > CNAME
git init
git add -A
git commit -m 'deploy'
git remote add origin git@github.com:bigbigbig2/bigbigbig2.github.io.git
git push --force origin master
cd ..
<meta name="referrer" content="no-referrer" />

#app{
    overflow: scroll;
}
#app::-webkit-scrollbar {
    width: 0px;
    height: 5px;
}
#app::-webkit-scrollbar {
    background: #ccc; 
    border-radius: 3px; 
}