$imagesDir = "public\assets\images"
$files = Get-ChildItem -Path $imagesDir -Include *.png, *.jpg, *.jpeg -Recurse

foreach ($file in $files) {
    $newName = [System.IO.Path]::ChangeExtension($file.FullName, ".webp")
    Write-Host "Converting $($file.Name) to $($file.Name.Replace($file.Extension, '.webp'))..."
    ffmpeg -i $file.FullName -q:v 80 $newName -y
}
