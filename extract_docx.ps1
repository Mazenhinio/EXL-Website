Add-Type -AssemblyName 'WindowsBase'
$docxPath = 'C:\Users\Work pc\Desktop\Desktop Github repos\EXL Website\EXL_Website_Copy_Master_v4.docx'
$outPath = 'C:\Users\Work pc\Desktop\Desktop Github repos\EXL Website\docx_text.txt'

$package = [System.IO.Packaging.Package]::Open($docxPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read)
$documentUri = New-Object System.Uri('/word/document.xml', [System.UriKind]::Relative)
$part = $package.GetPart($documentUri)
$reader = New-Object System.IO.StreamReader($part.GetStream())
$xmlContent = $reader.ReadToEnd()
$reader.Close()
$package.Close()

# Parse XML and extract text
$xml = [xml]$xmlContent
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')

$paragraphs = $xml.SelectNodes('//w:p', $ns)
$lines = @()
foreach ($para in $paragraphs) {
    $runs = $para.SelectNodes('.//w:t', $ns)
    $text = ''
    foreach ($run in $runs) {
        $text += $run.InnerText
    }
    $lines += $text
}

$lines | Out-File -FilePath $outPath -Encoding UTF8
Write-Host "Done. Output at $outPath"
