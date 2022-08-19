yarn build
cd dist
echo www.luxd.fun > CNAME
git init
git add -A
git commit -m 'deploy'
git remote add origin git@github.com:bigbigbig2/bigbigbig2.github.io.git
git push --force origin master
cd ..
