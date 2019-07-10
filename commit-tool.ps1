$message = Read-Host 'Commit Message';
$version = Read-Host 'Patch(0), Minor(1) or Major(2)'

git add .
git commit -m $message

if ($version -eq 0) {
    npm version patch;
}
elseif ($version -eq 1) {
    npm version minor;
}
elseif ($version -eq 2) {
    npm version major
}
else {
    npm version patch;
}
