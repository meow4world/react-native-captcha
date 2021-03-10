require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-captcha"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-captcha
                   DESC
  s.homepage     = "https://github.com/meow4world/react-native-captcha"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "meow4world" => "onlysd1@163.com" }
  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/meow4world/react-native-captcha.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  s.dependency "NTESVerifyCode"
end

