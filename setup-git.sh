#!/bin/bash

# Git 커밋 메시지 템플릿 설정
echo "🔧 Git 커밋 메시지 템플릿 설정 중..."

# 프로젝트 로컬 Git 설정
git config commit.template .gitmessage

# 사용자 정보 설정 (필요시 수정)
echo "👤 Git 사용자 정보를 설정하세요:"
echo "git config user.name \"Your Name\""
echo "git config user.email \"your.email@example.com\""

# Git 초기화 (아직 초기화되지 않은 경우)
if [ ! -d ".git" ]; then
    echo "📁 Git 저장소 초기화 중..."
    git init
    echo "✅ Git 저장소가 초기화되었습니다."
fi

# Husky 설정
echo "🐕 Husky 설정 중..."
pnpm prepare

echo "✅ Git 설정이 완료되었습니다!"
echo ""
echo "이제 다음 명령어로 커밋할 수 있습니다:"
echo "git add ."
echo "git commit"
echo ""
echo "커밋 시 .gitmessage 템플릿이 자동으로 표시됩니다." 